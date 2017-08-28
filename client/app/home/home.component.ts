import { Component, OnInit } from '@angular/core';

import { User, Post } from '../_models/index';
import { UserService, AlertService, PostService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    posts: Post[] = [];
    model: any = {};
    loading = false;

    constructor(
        private userService: UserService, 
        private alertService: AlertService, 
        private postService: PostService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllPosts();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllPosts() {
        this.postService.getAll().subscribe(posts => { this.posts = posts; });
    }

    submitPost() {
        this.loading = true;
        console.log(this.model);
        
        this.postService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Post successful', true);
                    this.loading = false;
                    this.loadAllPosts();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}