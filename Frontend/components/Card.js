import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Chip, useTheme} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

function Card(props) {
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
            width: '100%',
            paddingTop: 20,
          }}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              {props.card.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: '300',
                color: '#e4e4e4',
                textAlign: 'center',
              }}>
              {props.card.info}
            </Text>
          </View>
          <Image
            source={{uri: props.card.photo}}
            resizeMode="cover"
            style={{
              height: 75,
              width: 75,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#e4e4e4',
            textAlign: 'center',
            padding: 10,
          }}
          numberOfLines={1}>
          {props.card.headline}
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            margin: 12,
          }}>
          <Text
            numberOfLines={3}
            style={{
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {props.card.requirements}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            paddingStart: 4,
            paddingBottom: 12,
            alignItems: 'center',
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          {/* {skills} */}
          {props.card.skills
            .filter((e, i) => {
              return i < 4;
            })
            .map((skill, index) => (
              <Chip
                key={index}
                textStyle={{
                  // color: colors.primary,
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                style={{
                  marginEnd: 8,
                  marginBottom: 8,
                  backgroundColor: '#af4448',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                {skill}
              </Chip>
            ))}
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
        <FontAwesome
          name="twitter"
          size={24}
          color={'#fff'}
          style={{
            padding: 10,
          }}
        />
        <FontAwesome
          name="linkedin"
          size={24}
          style={{
            padding: 10,
          }}
          color={'#fff'}
        />
        <FontAwesome
          name="github"
          style={{
            padding: 10,
          }}
          size={24}
          color={'#fff'}
        />
      </View>

      <View
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: colors.primary,
          borderRadius: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          View Profile
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828fe',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 4,
    borderRadius: 24,
  },
});

export default Card;
