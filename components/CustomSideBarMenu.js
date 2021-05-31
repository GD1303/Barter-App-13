import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

import db from '../Config';

export default class CustomSideBarMenu extends React.Component {
    state = {
        userId: firebase.auth().currentUser.email,
        image: '#',
        name: '',
        docId: '',
    }

    selectPicture = async () => {
        //using ImagePicker to select the image from the local device
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(!cancelled) {
            this.uploadImage(uri, this.state.userId);
        };
    }

    uploadImage = async (uri, imageName) => {
        //upload the image to the cloud storage
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child('user_profiles/' + imageName);
        
        return ref.put(blob).then((response) => {
            this.fetchImage(imageName);
        });
    }

    fetchImage = (imageName) => {
        //to get image from cloud storage
        var storageRef = firebase.storage().ref().child('user_profiles/' + imageName);

        //get the download URL
        storageRef.getDownloadURL()
        .then(url => {
            this.setState({
                image: url,
            });
        })
        .catch(error => {
            this.setState({
                image: '#',
            });
        });
    }

    getUserProfile = () => {
        db.collection('users').where('email_id', '==', this.state.userId).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    name: doc.data().first_name + ' ' + doc.data().last_name,
                    docId: doc.id,
                });
            });
        });
        db.collection('users').where('email_id', '==', this.state.userId)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    image: doc.data().image,
                });
            });
        });
    }

    componentDidMount() {
        this.fetchImage(this.state.userId);
        this.getUserProfile();
    }

    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.profileContainer }>
                    <Avatar
                        source = {{
                            uri: this.state.image,
                        }}
                        size = { 'xlarge' }
                        onPress = {() => {
                            this.selectPicture();
                        }}
                        showEditButton rounded />
                    <Text style = { styles.imageText }>
                        { this.state.name }
                    </Text>
                </View>
                <View style = { styles.drawerItemsContainer }>
                    <DrawerItems {...this.props} />
                </View>
                <View style = {{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                }}>
                    <TouchableOpacity 
                        style = {{
                            justifyContent: 'center',
                            padding: 10,
                            height: 30,
                            width: '100%',
                        }}
                        onPress = {() => {
                            this.props.navigation.navigate('Login');
                            firebase.auth().signOut();
                        }}>
                        <Icon
                            name = 'sign-out'
                            type = 'font-awesome'
                            size = { 20 }
                            iconStyle = {{ paddingLeft: 10 }} />
                        <Text style = {{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 30
                        }}>
                            LOGOUT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.,
    },
    drawerItemsContainer: {
        flex: 0.8,
    },
    imageContainer: {
        flex: 1,
        width: '50%',
        height: '30%',
        marginLeft: 20,
        marginTop: 30,
        borderRadius: 40,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffe0b2',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 40,
    },
    imageText: {
        fontSize: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        padding: 20
    },
});