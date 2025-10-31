module.exports = class GroupDto {
	avatarUrl;
	groupName;
	members;
	lastMessage;
	unreadCounter;
	id;

	constructor(model) {
		this.avatarUrl = model.avatarUrl;
		this.groupName = model.groupName;
		this.members = model.members;
		this.lastMessage = model.lastMessage;
		this.unreadCounter = model.unreadCounter;
		this.id = model.id;
	}
};
