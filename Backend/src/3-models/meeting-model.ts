import Joi from "joi";
import { ValidationError } from "./client-errors";

class MeetingModel {
    public meetingId: number;
    public groupId: number;
    public meetingStartDate: Date;
    public meetingEndDate: Date;
    public meetingDescription: string;
    public meetingRoom: string;

    public constructor(meeting: MeetingModel){
        this.meetingId = meeting.meetingId;
        this.groupId = meeting.groupId;
        this.meetingStartDate = meeting.meetingStartDate;
        this.meetingEndDate = meeting.meetingEndDate;
        this.meetingDescription = meeting.meetingDescription;
        this.meetingRoom = meeting.meetingRoom;
    }

    private static validationSchema = Joi.object({
        meetingId: Joi.number().optional().positive().integer(),
        groupId: Joi.number().required().positive().integer(),
        meetingStartDate: Joi.date().required(),
        meetingEndDate: Joi.date().required(),
        meetingDescription: Joi.string().required().max(400),
        meetingRoom: Joi.string().required().max(40),

    });

    public validate():void{
        const result = MeetingModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message); 
    }

}

export default MeetingModel;