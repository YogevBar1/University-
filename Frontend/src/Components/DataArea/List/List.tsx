import React, { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";
import GroupModel from "../../../Models/3-models/GroupModel";
import { useForm } from "react-hook-form";
import { format, differenceInMinutes } from 'date-fns';
import MeetingModel from "../../../Models/3-models/MeetingModel";

function List(): JSX.Element {
    // State to store the list of all groups and the meetings for the selected group
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [meetingsBySelectedGroup, setMeetingsBySelectedGroup] = useState<MeetingModel[]>([]);

    // Fetch the list of all groups on component mount
    useEffect(() => {
        dataService.getAllGroups()
            .then(backendGroups => setGroups(backendGroups))
            .catch(err => notifyService.error(err));
    }, []);

    // Get the form control methods from react-hook-form
    const { register } = useForm<GroupModel>();

    // Function to handle when a group is selected from the dropdown
    async function handleSelect(selectedGroup: GroupModel) {
        try {
            // Fetch meetings for the selected group
            const meetings = await dataService.getMeetingsByGroupId(selectedGroup.groupId);
            setMeetingsBySelectedGroup(meetings);
        } catch (error) {
            // Notify the user in case of an error
            notifyService.error(error);
        }
    }

    return (
        <div className="List">
            <h2>Our study groups:</h2>
            <br />
            <label>Select Group:</label>
            <select required defaultValue="" {...register("groupId")} onChange={(event) => handleSelect(groups.find(group => group.groupId === parseInt(event.target.value)))}>
                <option disabled value="">Pick a Study Group</option>
                {groups.map(group => <option key={group.groupId} value={group.groupId}>{group.groupName}</option>)}
            </select>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Meeting ID</th>
                        <th>Meeting Start Date</th>
                        <th>Meeting End Date</th>
                        <th>Meeting Duration (hh:mm)</th>
                        <th>Meeting Description</th>
                        <th>Meeting Room</th>
                    </tr>
                </thead>
                <tbody>
                    {meetingsBySelectedGroup.map(meeting =>
                        <tr key={meeting.meetingId}>
                            <td>{meeting.meetingId}</td>
                            <td>{format(new Date(meeting.meetingStartDate), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{format(new Date(meeting.meetingEndDate), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{formatDuration(differenceInMinutes(new Date(meeting.meetingEndDate), new Date(meeting.meetingStartDate)))}</td>
                            <td>{meeting.meetingDescription}</td>
                            <td>{meeting.meetingRoom}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Function to format duration in hh:mm
function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export default List;

