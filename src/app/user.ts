
export class User {
    id: String;
    email: String;
    password: String;
    type: String;
    active: Boolean;
    sId: String;
    createDate: Date;

    constructor() {
        this.id = '';
        this.email = '';
        this.password = '';
        this.type = 'User';
        this.active = false;
        this.sId = '';
        this.createDate = null;
    }
}
