export default class UserDto{
    email;
    id;
    isActivated;
    birthDay;
    role;
    name;
    lastName;
    fathersName;

    constructor(model){
        this.email=model.email;
        this.id = model._id;
        this.birthDay = model.birthDay;
        this.name = model.name;
        this.lastName = model.lastName;
        this.fathersName = model.fathersName;
        this.isActivated = model.isActivated;
        this.role=model.role;
    }
}