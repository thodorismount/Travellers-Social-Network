import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import CreatePostDialog from '../components/CreatePostDialog';
import PostCard from '../components/PostCard';


export class home extends Component {
    render() {
        return (
            <Grid container >
             <Grid item sm={6} xs={6}>
                <PostCard />
                <PostCard />
                <PostCard />
            </Grid>
             <Grid item sm={6} xs={6}>
             <CreatePostDialog/>
             </Grid>
            </Grid>
            


        )
    }
}

export default home
