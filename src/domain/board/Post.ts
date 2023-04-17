import anissia from "../../common/anissia";
import md from "../../common/md";
import {Topic} from "./Topic";
import Session from "../session/Session";

export class Post {
    constructor(topic: Topic = new Topic()) {
        this.topic = topic.topic;
    }

    public postNo = 0;
    public topicNo = 0;
    public content = "";
    public name = "";
    public root = true;
    public regTime = 0;
    public updTime = 0;


    public topic = "";
    public isEditMode = false;

    public canEdit(user: Session): boolean {
        return this.name == user.name;
    }

    public canDelete(user: Session): boolean {
        return this.name == user.name || user.isAdmin;
    }

    public get isModified(): boolean {
        return this.regTime != this.updTime;
    }

    public get isNew(): boolean {
        return this.isNewTopic || this.isNewPost;
    }

    public get isNewTopic(): boolean {
        return this.topicNo == 0 && this.postNo == 0;
    }

    public get isNewPost(): boolean {
        return this.topicNo != 0 && this.postNo == 0;
    }

    public get regDtText(): string {
        return anissia.ymdOrDynamicAgo(this.regTime * 1000);
    }

    public get updDtText(): string {
        return anissia.ymdOrDynamicAgo(this.updTime * 1000);
    }

    public get contentHtml(): string {
        return md.render(this.content);
    }

    public static getNewTopic() {
        const p = new Post();
        p.isEditMode = true;
        return p;
    }

    public static getNewPost(topic: Topic) {
        const p = new Post(topic);
        p.root = false;
        p.topicNo = topic.topicNo;
        p.isEditMode = true;
        return p;
    }
}