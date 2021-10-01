import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Ioncions from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import {Linking} from 'react-native';
import {useAuth} from '../App';

// TODO: remove the chats below

function getBoilerplateChats(userChatting, user) {
  const chats = [
    {
      id: 1,
      message: 'Hello ' + user?.name?.split(' ')[0] + ' 👋',
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 2,
      message: 'Hi ' + userChatting.name.first + ' 👋 How are you?',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 3,
      message: 'I am good, how about you?',
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 4,
      message: 'I am good!',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 5,
      message: "How's your project work going on?",
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 6,
      message: 'Did you solve the pending issues?',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 7,
      message: "No, I'll start working on it now... Thank you for reminding!",
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 200,
      message: `I was reading the Stripe documentation at 
https://stripe.com/docs`,
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 8,
      message: "Let's catch up at 4 pm today",
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 9,
      message: 'Ok, see you then!',
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 10,
      message:
        'Join the meeting by clicking the link https://meet.google.com/inf-jscp-uck',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
  ];

  return chats;
}

function Chat(props) {
  const scrollViewRef = React.useRef();

  const {userChatting} = props.route.params;

  const {colors} = useTheme();

  const {user} = useAuth();

  const [chatText, setChatText] = React.useState('');

  const [chats, setChats] = React.useState(
    getBoilerplateChats(userChatting, user),
  );

  function getMarginBottom(index) {
    if (index === chats.length - 1) {
      return 0;
    }

    if (chats[index + 1].senderId === chats[index].senderId) {
      return 2;
    }

    return 10;
  }

  function getBorderRadius(index) {
    if (index === 0) {
      return 4;
    }

    if (chats[index - 1].senderId === chats[index].senderId) {
      return 14;
    }

    return 4;
  }

  React.useEffect(() => {}, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECE5DD',
      }}>
      <ImageBackground
        source={
          {
            // uri: 'https://i.redd.it/qwd83nc4xxf41.jpg',
          }
        }
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: 140,
            paddingLeft: '4%',
            paddingRight: '4%',
          }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          style={{
            flex: 1,
            width: '100%',
          }}>
          {chats.map((chat, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: 12,
                  maxWidth: '70%',
                  borderRadius: 14,
                  borderTopRightRadius:
                    chat.senderId === 'me' ? getBorderRadius(index) : 14,
                  borderTopLeftRadius:
                    chat.senderId === 'me' ? 14 : getBorderRadius(index),
                  marginBottom: getMarginBottom(index),
                  backgroundColor:
                    chat.senderId === 'me' ? colors.primary : '#fff',
                  alignSelf: chat.senderId === 'me' ? 'flex-end' : 'flex-start',
                  elevation: 2,
                }}>
                <Hyperlink
                  linkStyle={{
                    color: chat.senderId === 'me' ? '#d3ffff' : '#007bff',
                    fontWeight: 'bold',
                    // underline the link
                    textDecorationLine: 'underline',
                  }}
                  onPress={(url, text) => {
                    Linking.openURL(url).catch(error =>
                      console.warn('An error occurred: ', error),
                    );
                  }}>
                  <Text
                    selectable={true}
                    style={{
                      color: chat.senderId === 'me' ? '#fff' : colors.primary,
                    }}>
                    {chat.message}
                  </Text>
                </Hyperlink>
              </View>
            );
          })}
        </ScrollView>
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '95%',
          margin: 10,
          // marginBottom: 0,
          borderRadius: 12,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 4,
          padding: 6,
        }}>
        <TextInput
          placeholderTextColor={colors.textLightBlack}
          placeholder="Type something..."
          multiline={true}
          value={chatText}
          onChangeText={text => setChatText(text)}
          style={{
            color: colors.primary,
            fontSize: 16,
            flex: 1,
            paddingLeft: 10,
          }}></TextInput>
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setChatText('');
            setChats([
              ...chats,
              {
                id: chats.length + 1,
                message: chatText,
                senderId: 'me',
                receiverId: userChatting.cell,
              },
            ]);
          }}>
          <Ioncions
            name="ios-send"
            size={20}
            color={'#fff'}
            style={{
              transform: [{rotate: '-45deg'}],
              marginBottom: 2,
              marginLeft: 2,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Chat;