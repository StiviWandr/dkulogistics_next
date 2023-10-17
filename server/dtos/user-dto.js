export default class UserDto{
    email;
    id;
    isActivated;
    birthDate;
    role;

    constructor(model){
        this.email=model.email;
        this.id = model._id;
        this.birthDate = model.birthDate;
        this.name = model.name;
        this.isActivated=model.isActivated;
        this.role=model.role;
    }
}