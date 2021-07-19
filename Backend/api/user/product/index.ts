import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import { ProductDocument } from "@/models/Product";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import create from "./handlers/create";
import getAll from "./handlers/getAll";
const formidable = require("formidable");

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type CreateBody = {
  // name: String;
  // code: String;
  // date : Date;
  // weight : Number;
  // color : String;
  createBy: mongoose.Schema.Types.ObjectId;

  filePath: string;
};

export type ProductHandlers = {
  create: CheckeeHandler<ProductDocument[], CreateBody>;
  getAll: CheckeeHandler<ProductDocument[]>;
};

const METHODS = ["POST", "GET" /* 'PUT', 'DELETE' */];

const ProductAPI: CheckeeApiHandler<ProductDocument[], ProductHandlers> =
  async (req, res, handlers) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
      if (req.method === "POST") {
        /**
         * Kiểm tra role cho từng handler
         */
        const athz = await authorize(req, [ROLES.NORMAL]);
        if (!athz.isAuthorized) {
          return res.status(athz.status).json({
            data: null,
            errors: athz.errors,
          });
        }
        //
        const form = formidable({
          uploadDir: "./files/",
          keepExtensions: true,
          multiples: true,
          maxFileSize: 3 * 1024 * 1024,
        });

        // form.uploadDir = "./files/"
        // form.maxFileSize = 1 * 1024 * 1024

        const formDatas: any = await new Promise(function (resolve, reject) {
          form.parse(req, function (err: any, fields: any, files: any) {
            if (err) {
              reject(err);
              return;
            }

            resolve({ fields: fields, files: files });
          }); // form.parse
        });

        // console.log('formfields', formDatas)
        // TODO: validate formDatas

        const body = {
          filePath: formDatas.files.file.path,
          createBy: formDatas.fields.createBy,
        };
        return await handlers["create"]({ req, res, body });
      }
      if (req.method === "GET") {
        /**
         * Kiểm tra role cho từng handler
         */
        const athz = await authorize(req, [ROLES.NORMAL, ROLES.SUPERADMIN]);
        if (!athz.isAuthorized) {
          return res.status(athz.status).json({
            data: null,
            errors: athz.errors,
          });
        }

        const body = null;
        return await handlers["getAll"]({ req, res, body });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ data: null, errors: [{ message: error.message }] });
    }
  };

export const handlers = { create, getAll };
export default createApiHandler(ProductAPI, handlers, {});
