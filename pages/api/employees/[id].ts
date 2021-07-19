import dbConnect from "@/utils/dbConnect";
import Employee from "@/models/Employee";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect()

	switch (method) {
		case "GET":
			try {
				const employee = await Employee.findById(id);

				return res.status(200).json({
					success: true,
					data: employee,
				});
			} catch (error) {
				return res.status(404).json({
					success: false,
					message: error.message,
				});
			}
		case "PUT":
			try {
				const employee = await Employee.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				return res.status(200).json({
					success: true,
					data: employee,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
					message: error.message,
				});
			}
		case "DELETE":
			try {
				await Employee.deleteOne({ _id: id });

				return res.status(200).json({
					success: true,
					data: { id },
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
					message: error.message,
				});
			}
		default:
			return res
				.status(405)
				.json({ success: false });
	}
};
