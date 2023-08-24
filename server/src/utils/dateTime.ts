export default class DateTime {
    public dateTime: Date | undefined;
    public setUTCDateTime(dateTime: string): void {
        console.log("dateTime", dateTime)
        // Date Time Format UTC 
        let date = new Date(dateTime.split(" ")[0]);
        let time = dateTime.split(" ")[1];
        let hours = Number(time.split(":")[0]);
        let minutes = Number(time.split(":")[1]);
        let mealTime = new Date(date).setUTCHours(hours, minutes, 0, 0);
        
        this.dateTime = new Date(mealTime);
    }

    public getUTCDateTime(): Date {
        return this.dateTime as Date;
    }
}