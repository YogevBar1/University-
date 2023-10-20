import axios from "axios";
import GroupModel from "../Models/3-models/GroupModel";
import appConfig from "../Utils/AppConfig";
import MeetingModel from "../Models/3-models/MeetingModel";

class DataService {
    public async getAllGroups(): Promise<GroupModel[]> {
        const response = await axios.get<GroupModel[]>(appConfig.groupsUrl);
        const groups = response.data;
        return groups;

    }

    public async getMeetingsByGroupId(groupId : number): Promise<MeetingModel[]>{
        const response = await axios.get<MeetingModel[]>(appConfig.meetingsByGroupIdUrl + groupId);
        const meetingsByGroupId = response.data;
        return meetingsByGroupId;
    }

    public async addMeeting(meeting: MeetingModel): Promise <void>{
        await axios.post<MeetingModel>(appConfig.meetingsUrl, meeting);
    }
}
const dataService = new DataService();

export default dataService;
