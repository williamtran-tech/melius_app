export default class DateTime {
    public dateTime: Date | undefined;
    public setUTCDateTime(dateTime: string): void {
        let hours = 0;
        let minutes = 0;
        // Date Time Format UTC 
        if (dateTime) {
            let date = new Date(dateTime.split(" ")[0]);
            if (dateTime.split(" ")[1] ) {
                let time = dateTime.split(" ")[1];
                hours = Number(time.split(":")[0]);
                minutes = Number(time.split(":")[1]);
            }
            let mealTime = new Date(date).setUTCHours(hours, minutes, 0, 0);
            
            this.dateTime = new Date(mealTime);
        } else {
            this.dateTime = undefined;
        }
    }

    public getUTCDateTime(): Date {
        return this.dateTime as Date;
    }
}