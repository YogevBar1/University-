class AppConfig {
    public meetingsByGroupIdUrl = "http://localhost:4000/api/meetings-by-group-id/";
    public meetingsUrl = "http://localhost:4000/api/meetings/";
    public groupsUrl = "http://localhost:4000/api/groups/";
}

const appConfig = new AppConfig();

export default appConfig;
