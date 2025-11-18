module.exports = class UserDto {
	firstName;
	secondName;
	email;
	avatarUrl;
	id;
    friends;

	constructor(model) {
		this.firstName = model.firstName;
		this.secondName = model.secondName;
		this.email = model.email;
		this.avatarUrl = model.avatarUrl;
		this.id = model.id;
        this.friends = model.friends;
	}
};
