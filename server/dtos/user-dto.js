export default class UserDto{
    email;
    id;
    isActivated;
    birthDay;
    role;

    constructor(model){
        this.email=model.email;
        this.id = model._id;
        this.birthDay = model.birthDay;
        this.name = model.name;
        this.isActivated=model.isActivated;
        this.role=model.role;
    }
}