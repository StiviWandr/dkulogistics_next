export default class UserDto{
    email;
    id;
    isActivated;
    birthDay;
    role;
    name;
    vorname;
    lastname;

    constructor(model){
        this.email=model.email;
        this.id = model._id;
        this.birthDay = model.birthDate;
        this.name = model.name;
        this.vorname = model.vorname;
        this.lastname = model.lastname;
        this.isActivated=model.isActivated;
        this.role=model.role;
    }
}