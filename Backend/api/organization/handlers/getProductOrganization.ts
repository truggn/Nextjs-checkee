import dbConnect from "@/utils/dbConnect";
import type { OrganizationIdHandlers } from "../id";
import Organization from "@/models/Organization";
import Product from "@/models/Product";
import Producttype from "@/models/ProductType";
const getProductOrganization: OrganizationIdHandlers["getProductOrganization"] =
  async ({ res, req, body }) => {
    try {
      await dbConnect();

      const _data = await Producttype.find({
        organizationId: req.query.id,
      })
        .select("name productRepresentation")
        .sort({
          createdAt: "desc",
        });

      return res.status(200).json({
        data: _data,
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        errors: [{ message: error.message }],
      });
    }
  };

export default getProductOrganization;
