module.exports = class GroupDto {
	avatarUrl;
	groupName;
	members;
	id;

	constructor(model) {
		this.avatarUrl = model.avatarUrl;
		this.groupName = model.groupName;
		this.members = model.members;
		this.id = model.id;
	}
};
