import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import MeetingModel from "../3-models/meeting-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// GET http://localhost:4000/api/groups
router.get("/groups", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groups = await dataService.getAllGroups();
        response.json(groups);
    }
    catch(err: any) { next(err); }
});

// GET http://localhost:4000/api/meetings-by-group-id/:groupId
router.get("/meetings-by-group-id/:groupId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groupId = +request.params.groupId;
        const meetingByGroupId = await dataService.getAllMeetingsByGroupId(groupId);
        response.json(meetingByGroupId);
    }
    catch(err: any) { next(err); }
});

// POST http://localhost:4000/api/meetings
router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting = new MeetingModel(request.body);
        const addedMeeting = await dataService.addMeeting(meeting);
        response.status(StatusCode.Created).json(addedMeeting);
    }
    catch(err: any) { next(err); }
});

export default router;
