import dbConnect from "@/utils/dbConnect";
import type { OrganizationMembersHandlers } from "..";
import OrganizationMembers from "@/models/OrganizationMembers";
import User from "@/models/User";
import Organization from "@/models/Organization";

const createOrganizationMembers: OrganizationMembersHandlers["createOrganizationMembers"] =
  async ({ res, req, body }) => {
    await dbConnect();
    // const session = await OrganizationMembers.startSession();
    // session.startTransaction();
    try {
      let flag = 0;
      await Promise.all(
        req.body.data.map(async (member) => {
          const _user = await User.findOne({
            _id: member.userId,
            isDeleted: false,
          });

          if (!_user) {
            // await session.abortTransaction();
            // session.endSession();
            flag = 1;
            return res.status(400).json({
              data: null,
              errors: [{ message: `userId ${member.userId} không xác định.` }],
            });
          }

          const _member = await OrganizationMembers.findOne({
            userId: member.userId,
            organizationId: member.organizationId,
          });

          if (_member) {
            // await session.abortTransaction();
            // session.endSession();
            flag = 1;

            return res.status(400).json({
              data: null,
              errors: [
                { message: `userId ${member.userId} đã thuộc tổ chức.` },
              ],
            });
          }

          const _organization = await Organization.findOne({
            _id: member.organizationId,
          });

          if (_organization) {
            const _data: any = {
              organizationId: member.organizationId,
              organizationName: _organization.name_customer,
            };

            await User.findOneAndUpdate(
              { _id: member.userId },
              { $push: { memberOfOrganizations: _data } }
            );
          }

          if (!_organization) {
            // await session.abortTransaction();
            // session.endSession();
            flag = 1;

            return res.status(400).json({
              data: null,
              errors: [
                {
                  message: `organizationId ${member.organizationId} không xác định.`,
                },
              ],
            });
          }

          // await OrganizationMembers.create([member],
          //     {
          //         session: session
          //     });
        })
      );

      // await session.commitTransaction();

      if (flag == 0) {
        await OrganizationMembers.create(req.body.data);

        return res.status(200).json({
          data: null,
          errors: [{ message: "Thêm đối tượng vào tổ chức thành công." }],
        });
      }
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      return res.status(500).json({
        data: null,
        errors: [{ message: error.message }],
      });
    }
  };

export default createOrganizationMembers;
