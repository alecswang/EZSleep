import React, {useContext} from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { auth, database } from "../utilities/firebase";
let uID;
if (auth.currentUser) {
  uID = auth.currentUser.uid;
}
import { update, ref, onValue } from "firebase/database";

import { ThemeContext } from "../utilities/ThemeContext";
import { Themes } from "../utilities/Themes";

let currentTheme = ref(database, uID + "/theme");
if (currentTheme) {
  onValue(currentTheme, (snapshot) => {
    currentTheme = snapshot.val();
    console.log(currentTheme);
  });
}

//Learn Page
const CircadianCycles = (props) => {
  const nav = useNavigation();
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.scrollViewContainer]}>
      <ScrollView
        contentContainerStyle={styles.scrollInnerContainer}
        style={[Themes[theme],]}
      >
        <Text style={styles.title}>Circadians Cycles</Text>
        <Text style={[styles.text, Themes[theme],]}>
          What is Circadian Rhythm Sleep-Wake Disorder, Delayed Sleep Phase
          Type? Also known as Delayed Sleep Phase Syndrome, it is a disorder
          that involves the body's master clock. Most processes in the body such
          as hunger, digestion, temperature, sleep onset and many others are
          orchestrated by an internal clock which keeps time and keeps the
          entire body and its processes in synchrony. The master clock governs
          when we feel sleepy and ready to go to bed. For most people that time
          is around 10 to 11 PM. But in Delayed Sleep Phase Syndrome sleep onset
          and wake times are usually delayed 3 to 6 hours relative to
          conventional sleep-wake times. The patient typically finds it
          difficult to initiate sleep before sometime between 12 and 6 am and,
          when free of societal constraints, prefers a wake time that is about 8
          hours later. Sleep itself is reported to be normal for the person's
          age. These symptoms are quite often of many years duration and
          typically start in late childhood or teen years. When we sleep on our
          natural clock, our sleep cycles look more or less like the photo
          below. We typically go into REM sleep every 90-120 minutes and will
          typically have 3-5 REM cycles during our sleep period. image.png
          However, if we go to sleep earlier than our natural clock, we will
          either lay awake for hours until our brain is ready to go into our
          clock or will have choppy (fragmented) sleep, as in this picture
          below, often even if we take a "sleep aid". Our REM cycles will start
          later and we will miss one or more of our REM cycles, so that when we
          have to wake up, we will feel more tired and unrefreshed: image.png In
          this picture, you can see that the person with a delayed clock will
          either lay awake for hours or will go into light stages of sleep, but
          cannot get into the REM cycles until their natural clock is ready for
          it. When the person is then forced to wake up earlier than their
          natural clock, they have missed one or more REM cycles, which can lead
          to fatigue during the day. Unfortunately, the next night, even though
          the person is tired from the sleep deprivation above, their clock is
          not ready to start the cycles at their bedtime and the cycle continues
          with chronic sleep deprivation. The clinical picture may be similar to
          sleep-onset insomnia. People with this disorder are unable to advance
          their sleep times (make themselves fall asleep earlier at a more
          normal time) despite repeated attempts. People often report feeling
          most alert in the late evening, and they are called 'night owls'.
          Enforced conventional wake times may result in chronically
          insufficient sleep and excessive daytime sleepiness. Sleepiness is
          greatest in the morning and lessens as the internal clock driven drive
          for wakefulness peaks in the late afternoon. In adolescents, the
          syndrome may be associated with daytime irritability and poor school
          performance, whereas in adulthood, the syndrome may be associated with
          impaired job performance, fatigue issues, as well as with relationship
          problems. What controls this clock? The internal clock is controlled
          by the secretion of melatonin from one part of the brain to the other.
          Melatonin is the darkness signal to the brain. Our melatonin secretion
          starts 4 hours prior to our natural clock. The amount of melatonin at
          EXACTLY the right time determines the time that we start our sleep
          cycles naturally and determines when we go into REM sleep. So to
          change our clock, we need to change the timing of our melatonin onset:
          How is Delayed Sleep Phase Syndrome Treated? There are several
          techniques to treat Delayed Sleep Phase Syndrome. Sometimes one may
          work or combinations of all may be necessary. I usually recommend
          starting with the easiest which is Melatonin therapy. Once a desired
          bedtime is established, one must resist the idea to go to bed later,
          because those with Delayed Sleep Phase Syndrome always want to drift
          to later bedtimes, and weeks of therapy to create an earlier bedtime
          can be ruined by couple of late nights, causing one to have to start
          all over again. Here is a summary of the techniques: 1. Melatonin
          Therapy Melatonin is a natural hormone secreted by the brain around
          bedtime, and signals the onset of sleep to the body and clock. Small
          doses of Melatonin can cause the hands of the master clock to shift to
          an earlier time, [phase advance] so that the body's rhythms including
          sleep onset shift to an earlier time. Please purchase Melatonin 0.5 mg
          only. For this protocol, we recommend that you avoid the higher dose
          tablets, such as the 2 mg, 3 mg, 5 mg or 10 mg tablets. MORE MELATONIN
          IS NOT BETTER FOR CIRCADIAN RHYTHM DISORDERS. REMEMBER, WE ARE NOT
          USING MELATONIN AS A SLEEPING PILL. WE ARE USING IT AS A CLOCK CHANGER
          You should purchase only pharmaceutical-grade melatonin, which is
          typically USP verified. It is available at Pacific Sleep Program but
          may also be available at reliable pharmacies. We carry Pure
          Encapsulations which is also available on Amazon at a slightly higher
          price. Many over-the-counter brands are not USP-verified; we do not
          recommend these sources. It will not cause most people to feel sleepy
          or dizzy at the doses recommend and the dosages below have been proven
          scientifically to work. Brain bedtime: *** to *** Desired bedtime: ***
          to *** Schedule for melatonin administration: During the first few
          weeks, you may feel nothing. That is normal as your clock is changing
          internally but you may not be able to perceive it as the REM cycles
          are moving. You do not have to stay up until the "brain" bedtime.
          Also, if you are currently on prescription sleep aids, you may
          continue them in addition to the melatonin unless instructed
          otherwise. You will STAY on the melatonin at the dose timing for Week
          *** (the final dose timing above) as long as you want to keep that
          desired bedtime. If you discontinue the melatonin or become erratic in
          taking it, your clock may start drifting later again. To do Melatonin
          therapy first determine your habitual bedtime, that is the time you
          are currently feeling sleepy. Then, start taking 0.5 mg of Melatonin
          every night four hours before your habitual bedtime. Do this for one
          week. After about three to four nights or so, try to go to sleep about
          one to one and one half hours earlier. In most instances after about
          one week of therapy, sleep onset and awakening should come earlier by
          about that amount. The second week, take the Melatonin four hours
          before your NEW earlier bedtime, and again in about three days try to
          go to sleep one to one and one half hours earlier. The third week
          repeat the process taking the Melatonin four hours before the new
          earlier bedtime established during the second week. Keep taking the
          Melatonin earlier each week until you are satisfied with the bedtime,
          and then maintain the melatonin dose four hours before that final
          earlier bedtime. You should avoid bright lights, including TV and
          computer screens, for at least 1-2 hours prior to bedtime as these
          sources can suppress your natural melatonin and the treatment may be
          less effective. There are currently apps/programs available for
          certain computers, including F.Lux for Mac, Linux and Iphone/Ipad,
          which can change your screen tones from the blue-green wavelengths in
          the morning to the red-orange ones in the evening. Theoretically,
          these may reduce the melatonin suppression caused by screen exposure
          in the evening; however this has not been demonstrated in widescale
          medical studies to be effective. A frequently asked question is: Do I
          have to take the melatonin forever? The answer in most cases is yes,
          as long as you want to stay at the adjusted clock. If you stop the
          protocol, there is a high likelihood that you will start having a
          drift again to a later clock time. However, in some cases, when the
          tendency to be a night owl is acquired and not natural, a person may
          be able to discontinue a circadian realignment protocol after 6-12
          months of being anchored at the new clock. 2. Bright Light Therapy --
          START AFTER WEEK *** You should expose yourself to bright light by
          getting out of bed in the morning and sitting close to the light
          (within 12 to 24 inches) for 10 to 60 minutes, depending on the
          intensity of your light therapy source. The simplest way to get bright
          light exposure is to sleep with the shades and curtains open so that
          morning light enters the room. Sometimes switching on the radio, TV ,
          or room lights with a timer also helps a person to wake up to take
          advantage of the natural morning light. Early morning sunbathing is
          useful if possible. However most of these ways to take advantage of
          natural sunlight are not practical in Oregon. As well we cannot of
          course control the time the natural light appears. It is thus
          necessary to purchase a Bright Light Box. Below is information that
          will help you decide on what type of light to purchase. Lightboxes are
          readily available at multiple sources, including Amazon.com, Costco
          and many pharmacies and home good stores. Lightboxes can come in
          either full-spectrum or blue-green wavelength types. These have both
          been noted to work equally effectively in circadian rhythm studies.
          The goal is to use the light therapy in the morning to suppress
          melatonin and provide a circadian "anchor" to keep your cycle earlier
          (more advanced). Some folks will read, while looking or scanning the
          light from time to time, or possibly exercise on a treadmill while
          looking at the light as much as possible. The timing is critical and
          should occur at about the same time each day, and about the time you
          wish to typically rise. The exposure should be continued daily with no
          skips to be most effective. It may take one to two weeks to show
          benefit. Some folks inadvertently choose the wrong time and note that
          their bedtime actually gets later than earlier. If that occurs, then
          you are using the light box too early in the morning and you should
          use it later by one to two hours.
        </Text>
      </ScrollView>
    </View>
  );
};

export default CircadianCycles;

const styles = StyleSheet.create({
  //general Layout
  scrollViewContainer: {
    height: 850,
    overflow: "hidden",
    width: "100%",
  },
  scrollInnerContainer: {
    alignItems: "center",
    paddingBottom: 1000,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000777",
  },
  //Article title
  title: {
    fontSize: 32,
    marginBottom: 16,
    position: "absolute",
    top: 70,
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    fontSize: 20,
    top: 160,
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#654CE0",
    position: "absolute",
    top: 70,
    right: 20,
  },
  //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
