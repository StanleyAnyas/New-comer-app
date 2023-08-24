import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 100,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#000",
    },
    
    errorMessage: {
        color: "red",
        fontSize: 20,
        textAlign: "center",
    },

    borderRed: {
        borderColor: "red",
    },
    container: {
        flex: 1,
    },
});

export const styleForm = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        width: 300,
        margin: 10,
    },
    button: {
        backgroundColor: "#fff",
        // borderColor: "black",
        // borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 100,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#000",
    },
    errorMessageStyle: {
        color: "red",
        fontSize: 20,
        textAlign: "center",
    },
    borderRed: {
        borderColor: "red",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 15,
        // flexDirection: "row",
        // alignItems: "center",
    },
    fieldLabel: {
        fontSize: 20,
        marginRight: 5,
        // fontWeight: "bold",
    },
});

export const listItems = StyleSheet.create({
    listItem: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    listItemText: {
        fontSize: 20,
    },
    editIcon: {
        position: "absolute",
        right: 10,
        top: 10,
    },
});