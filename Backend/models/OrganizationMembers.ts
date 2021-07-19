import mongoose , { Document,  Model} from "mongoose"
import { UserDocument } from '@/models/User';
import { OrganizationDocument } from '@/models/Organization';

const OrganizationMembersSchema = new mongoose.Schema({
  
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },

    createdAt: { 
        type: Date,
        default: Date.now
    },
  

}, {timestamps: true});

export interface IOrganizationMembers {
    createBy: UserDocument['_id'], 
    userId: UserDocument['_id'], 
    organizationId: OrganizationDocument['_id']
}
export interface OrganizationMembersDocument extends IOrganizationMembers, Document {

}

const OrganizationMembers : Model<OrganizationMembersDocument> = mongoose.models.OrganizationMembers || mongoose.model<OrganizationMembersDocument>("OrganizationMembers", OrganizationMembersSchema);

export default OrganizationMembers;