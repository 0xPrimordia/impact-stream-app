import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "../../../../lib/supabase-client";

export async function POST(request: Request) {
	const { address, userId } = await request.json();
	const token = jwt.sign(
		{
			address,
			sub: userId,
			aud: "authenticated",
		},
		process.env.SUPABASE_JWT_SECRET as string,
		{
			expiresIn: 60 * 2,
		}
	);

	const { error } = await supabaseAdmin
		.from("users")
		.upsert({ id: userId, address }, { defaultToNull: true });
	return new Response(null, {
		status: 200,
		headers: {
			"set-cookie": `supabase-token=${token}; Path=/; HttpOnly; Secure;`,
		},
	});
}
