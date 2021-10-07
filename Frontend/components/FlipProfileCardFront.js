import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import SkillSlider from './SkillSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IconButton, useTheme } from 'react-native-paper';

function FlipProfileCardFront(props) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        props.styles.container,
        {
          top: 50,
        },
      ]}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -50,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 1,
          shadowOpacity: 0.3,
          elevation: 4,
          borderRadius: 48,
          zIndex: 4,
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
          source={{uri: props.card.photo}}></Image>
      </TouchableOpacity>

      <View
        style={{
          paddingTop: 56,
          width: '100%',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {props.card.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.textLightBlack,
          }}>
          {props.card.info}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 0,
            color: colors.textLightBlack,
          }}
          numberOfLines={1}>
          {props.card.headline}
        </Text>
      </View>

      <IconButton
        icon="rotate-3d-variant"
        size={24}
        style={{
          paddingTop: 4
        }}
        color={colors.secondary}
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          paddingStart: 4,
          paddingBottom: 12,
          alignItems: 'center',
          // padding: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
        <SkillSlider />
      </View>

      <View
        style={{
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingBottom: 4,
        }}>
        <FontAwesome
          name="twitter"
          size={24}
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
        />
        <FontAwesome
          name="github"
          style={{
            padding: 10,
          }}
          size={24}
        />
      </View>
    </View>
  );
}

export default FlipProfileCardFront;
