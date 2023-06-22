import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import { supabase } from "../../../../lib/supabase-client";
import jwt from "jsonwebtoken";

import { withSessionRoute } from "../../../../lib/server";

export default withSessionRoute(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { message, signature } = req.body;
			const siweMessage = new SiweMessage(message);
			const fields = await siweMessage.validate(signature);
			if (fields.nonce !== req.session.nonce)
				return res.status(422).json({ message: "Invalid nonce." });
			req.session.siwe = fields;

			await req.session.save();

			//TODO: Add supabase interaction
			if (process.env.SUPABASE_URL) {
				const { data, error } = await supabase
					.from("users")
					.upsert({ address: fields.address })
					.select();
				if (!error) {
					const token = jwt.sign(
						{
							address: fields.address, // this will be read by RLS policy
							sub: data.id,
							aud: "authenticated",
						},
						process.env.SUPABASE_JWT_SECRET as string,
						{ expiresIn: 60 * 2 }
					);
					res.setHeader("Set-Cookie", `token=${token}; path=/; HttpOnly`);
				}
			}
			return res.json({ ok: true });
		} catch (ex) {
			console.error(ex);
			return res.json({ ok: false });
		}
	}

	res.setHeader("Allow", ["POST"]);
	return res.status(405).end(`Method ${req.method} Not Allowed`);
});
