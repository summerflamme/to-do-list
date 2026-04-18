
export enum statusTask{
  AFAIRE = "à faire",
  ENCOUR = "en cour",
  FINI = "fini",
  RETARD = 'en retard'
}

export class Task{
  constructor(
    public id:number = 0,
    public title: string  = "",
    public description: string = "",
    public status: statusTask = statusTask.AFAIRE,
    public start_date : Date = new Date(),
    public end_date : Date = new Date(),
    ) {
  }

}
