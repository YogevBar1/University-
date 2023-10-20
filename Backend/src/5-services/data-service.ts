import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import GroupModel from "../3-models/group-model";
import MeetingModel from "../3-models/meeting-model";

async function getAllGroups(): Promise<GroupModel[]> {
    const sql = "SELECT * FROM groups";
    const groups = await dal.execute(sql);
    return groups;
}

async function getAllMeetingsByGroupId(groupId: number): Promise<GroupModel[]> {
    const sql = "SELECT * FROM meetings WHERE groupId =?";
    const meetingsByGroupId = await dal.execute(sql, [groupId]);
    return meetingsByGroupId;
}

async function addMeeting(meeting: MeetingModel): Promise<MeetingModel>{
    meeting.validate();
    const sql = "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ? ,?)";
    const info: OkPacket = await dal.execute(sql,[meeting.groupId, meeting.meetingStartDate, meeting.meetingEndDate, meeting.meetingDescription, meeting.meetingRoom]);
    meeting.meetingId = info.insertId;
    return meeting;
}

export default {
    getAllGroups,
    getAllMeetingsByGroupId,
    addMeeting
};

