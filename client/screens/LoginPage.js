import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import googleIcon from "../assets/Image/search.png";
import facebookIcon from "../assets/Image/facebook1.png";
import twitterIcon from "../assets/Image/twitter.png";
import VerticalLogo from "../assets/Image/VerticalLogo.png";
const LoginPage = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.Btn}>
        <Image style={[styles.VerticalLogo]} source={VerticalLogo} />
        <TouchableOpacity
          style={styles.SignInBtn}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.btnText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpBtn}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.btnText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 40 }}>Hoặc đăng nhập bằng</Text>
        <View style={styles.IconContainer}>
          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={googleIcon}
          />
          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={facebookIcon}
          />
          <Image style={styles.icon} source={twitterIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  VerticalLogo: {
    width: 217,
    height: 69,
    marginBottom: 32,
  },
  Btn: {
    position: "absolute",
    width: 184,
    height: 99,
    top: 353,
    alignItems: "center",
    justifyContent: "center",
  },
  SignInBtn: {
    backgroundColor: "#518B1A",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtn: {
    backgroundColor: "#8CC840",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    marginTop: 15,
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  IconContainer: {
    flexDirection: "row",
    marginTop: 17,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default LoginPage;
