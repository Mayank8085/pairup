import React from 'react';
import {
  StatusBar,
  View,
  Animated,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {IconButton, Portal, useTheme} from 'react-native-paper';
import { leftOptions } from '../staticStore';
import { skillList } from '../staticStore';
import SkillSection from './SkillSection';

const {height} = Dimensions.get('window');

function Filter(props) {
  const {close} = props;

  const {colors} = useTheme();

  const springAnim = React.useRef(new Animated.Value(1000)).current;

  const [selectedLeftIndex, setSelectedLeftIndex] = React.useState(0);

  const [filterSkills, setFilterSkills] = React.useState([]);
  const [filterLanguages, setFilterLanguages] = React.useState([]);
  const [filterYears, setFilterYears] = React.useState([]);
  const [filterBranches, setFilterBranches] = React.useState([]);
  const [filterDivisions, setFilterDivisions] = React.useState([]);
  const [filterBatches, setFilterBatches] = React.useState([]);
  const [filterSocialMedia, setFilterSocialMedia] = React.useState([]);

  React.useEffect(() => {
    const slideIn = () => {
      Animated.spring(springAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    slideIn();
  }, []);

  const handleClose = () => {
    Animated.timing(springAnim, {
      toValue: height + 100,
      duration: 256,
      useNativeDriver: true,
    }).start(() => {
      close();
    });
  };

  const styles = StyleSheet.create({
    leftOptions: {
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: '#f1f3f6',
    },
  });

  return (
    <Portal>
      <Animated.View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight+12, // for full screen
          // top: StatusBar.currentHeight + height/10,
          left: 0,
          right: 0,
          bottom: 0,
          borderBottomColor: colors.border,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: 'hidden',
          backgroundColor: 'white',
          transform: [
            {
              translateY: springAnim,
            },
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: colors.textLightBlack,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.textHeadBlack,
            }}>
            Filter
          </Text>
          <IconButton
            color={colors.textHeadBlack}
            icon="close-thick"
            onPress={handleClose}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 0.3,
            }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {leftOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedLeftIndex(index)}
                  style={[
                    styles.leftOptions,
                    index == selectedLeftIndex
                      ? {
                          backgroundColor: 'white',
                        }
                      : {},
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: index == selectedLeftIndex ? colors.secondary : 'black',
                      fontWeight: index == selectedLeftIndex ? 'bold' : 'normal',
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              flex: 0.7,
              height: '100%',
              padding: 10,
            }}
          >
            <SkillSection
              skills={filterSkills}
              setSkills={setFilterSkills}
              skillList={skillList}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 1,
            shadowOpacity: 0.3,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 18,
            paddingLeft: 12,
            paddingRight: 12,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.textHeadBlack,
              }}
            >8</Text>
            <Text>Students found</Text>
          </View>
          <View>
            <TouchableHighlight
              style={{
                backgroundColor: colors.primary,
                padding: 12,
                paddingLeft: 36,
                paddingRight: 36,
                borderRadius: 8,
              }}
              onPress={handleClose}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.textWhite,
                }}
              >Apply</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
}

export default Filter;