import {
  View,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../App';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Portal, ActivityIndicator} from 'react-native-paper';
import * as Keychain from 'react-native-keychain';

function GoogleLogin() {
  const {
    signInWithGoogle,
    setUser,
    setIsSignedIn,
    axiosInstance,
    setaxiosInstance,
  } = useAuth();

  const navigation = useNavigation();

  const {colors} = useTheme();

  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const signIn = async () => {
    setIsLoggingIn(true);

    const userInfo = await signInWithGoogle();
    let new_user = false;
    let retries = 5;
    // NOTE Get the jwt access token
    let res_access_token;
    while (!res_access_token && retries--) {
      res_access_token = await axiosInstance
        .post('/signup_and_login', {
          username: userInfo.user.name.toLowerCase(),
          timeout: 15000,
        })
        .catch(err => {
          console.error('Access_token Error : ' + err);
        });
    }

    axiosInstance.defaults.headers['Authorization'] =
      'Bearer ' + res_access_token.data.access_token;

    new_user = res_access_token.data.new_user;

    if (!new_user) {
      let studRes;
      let degreeRes;
      let skillsListRes;
      let languagesRes;

      retries = 5;
      while (!studRes && retries--) {
        studRes = await axiosInstance.get('/get_student_profile').catch(err => {
          console.error('Get_Student Error : ' + err);
        });
      }

      retries = 5;
      while (!degreeRes && retries--) {
        degreeRes = await axiosInstance.get('/get_degree').catch(err => {
          console.error('Get Degree Error : ' + err);
        });
      }

      retries = 5;
      while (!skillsListRes && retries--) {
        skillsListRes = await axiosInstance
          .get('/get_stud_skills')
          .catch(err => {
            console.error('Get Skills Error : ' + err);
          });
      }

      retries = 5;
      while (!languagesRes && retries--) {
        languagesRes = await axiosInstance
          .get('/get_student_languages')
          .catch(err => {
            console.error('Get Languages Error : ' + err);
          });
      }

      let SocialsRes;
      while (!SocialsRes && retries--) {
        SocialsRes = await axiosInstance.get('/get_social_urls').catch(err => {
          console.error('Get Socials Error : ' + err);
        });
      }

      let userData = {
        googleId: userInfo.user.id,
        photo: userInfo.user.photo,
        email: userInfo.user.email,
        name: studRes.data.Name.toUpperCase(),
        personalEmail: 'NotinDB',
        bio: studRes.data.Bio,
        headline: studRes.data.Headline,
        year: degreeRes.data.year ? degreeRes.data.year : '',
        branch: degreeRes.data.branch,
        batch: degreeRes.data.batch,
        division: degreeRes.data.batch !== '' ? degreeRes.data.batch[0] : '',
        twitterUrl: SocialsRes.data.twitter,
        githubUrl: SocialsRes.data.github,
        linkedinUrl: SocialsRes.data.linkedin,
        skills: skillsListRes.data,
        languages: languagesRes.data.map(lang => {
          return lang.Language_name;
        }),
        access_token: res_access_token.data.access_token,
      };

      await Keychain.setGenericPassword('user', JSON.stringify(userData));
      setaxiosInstance({axiosInstance});
      setUser(userData);
      setIsLoggingIn(false);
      setIsSignedIn(true);
    }

    // else navigate to the sign up page
    else {
      setIsLoggingIn(false);
      navigation.navigate('SignUp', {
        user: userInfo.user,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {isLoggingIn && (
        <Portal>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000',
              opacity: 0.5,
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'white'} />
          </View>
        </Portal>
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: StatusBar.currentHeight,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              // uri: 'https://pbs.twimg.com/profile_images/549084012342296576/cafXBvpk.jpeg',
              uri: 'https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png',
            }}
            style={{
              width: '50%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primaryDark,
            marginBottom: 12,
            textAlign: 'center',
          }}>
          Connect your college's GSuite account with CollegeSpace
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textLightBlack,
            textAlign: 'center',
          }}>
          We need to verify your email address before you can use CollegeSpace
        </Text>
      </View>
      <View
        style={{
          padding: 16,
          paddingBottom: 24,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            signIn();
          }}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            width: '100%',
            padding: 16,
            paddingEnd: 24,
            paddingStart: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 8,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Login with Google
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg */}
      {/* 6D55F6 https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg*/}
    </View>
  );
}

export default GoogleLogin;
