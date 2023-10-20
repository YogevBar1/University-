import { useEffect, useState } from "react";
import "./Insert.css";
import GroupModel from "../../../Models/3-models/GroupModel";
import { useForm } from "react-hook-form";
import MeetingModel from "../../../Models/3-models/MeetingModel";
import { useNavigate } from "react-router-dom";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function Insert(): JSX.Element {

    const [groups, SetGroups] = useState<GroupModel[]>([]);
    const { register, handleSubmit} = useForm<MeetingModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllGroups()
            .then(databaseGroup => SetGroups(databaseGroup))
            .catch(err => notifyService.error(err));
    }, []);

    async function send(meeting: MeetingModel) {
        try {            
            if (meeting.meetingEndDate < meeting.meetingStartDate) {
                notifyService.error("Please select an end date that comes after or is equal to the start date.");
                return;
            }
            const {groupId, meetingStartDate, meetingEndDate } = meeting;

            // Fetch existing meetings for the selected group
            const existingMeetings = await dataService.getMeetingsByGroupId(groupId);

            // Convert the input start and end dates to Date objects for comparison
            const selectedStartDate = new Date(meetingStartDate);
            const selectedEndDate = new Date(meetingEndDate);

            // Check for overlapping meetings
            const overlap = existingMeetings.some(existingMeeting => {
                const existingStartDate = new Date(existingMeeting.meetingStartDate);
                const existingEndDate = new Date(existingMeeting.meetingEndDate);

                // Check if there's any overlap between the selected and existing meeting times
                return (
                    (selectedStartDate >= existingStartDate && selectedStartDate <= existingEndDate) ||
                    (selectedEndDate >= existingStartDate && selectedEndDate <= existingEndDate) ||
                    (existingStartDate >= selectedStartDate && existingStartDate <= selectedEndDate) ||
                    (existingEndDate >= selectedStartDate && existingEndDate <= selectedEndDate)
                );
            });

            if (overlap) {
                notifyService.error("This group already has a meeting scheduled during the selected time.");
                return;
            }

            await dataService.addMeeting(meeting);
            notifyService.success("Meeting successfully added.");
            navigate("/list");

        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">
            <h2>Add meeting</h2>
            
            <form onSubmit={handleSubmit(send)}>

                <label>Study Group:</label>
                <select required defaultValue="" {...register("groupId") }>
                    <option disabled value="">Select Study Group</option>
                    {groups.map(groupsStudy => <option key={groupsStudy.groupId} value={groupsStudy.groupId}>{groupsStudy.groupName}</option>)}
                </select>

                <label>Meeting Start Date and hour:</label>
                <input
                    type="datetime-local"
                    {...register("meetingStartDate") }
                    min={new Date().toISOString().slice(0, 16)} // Set the minimum value to the current date
                    required
                />

                <label>Meeting End Date and hour:</label>
                <input
                    type="datetime-local"
                    {...register("meetingEndDate")}
                    min={new Date().toISOString().slice(0, 16)} // Set the minimum value to the current date
                    required
                />

                <label>Meeting Description:</label>
                <input type="text" {...register("meetingDescription")} required />


                <label>Meeting Room:</label>
                <input type="text" {...register("meetingRoom")} required />

                <br /><br />
                <button>Add Meeting</button>

            </form>
        </div>
    );
}

export default Insert;


