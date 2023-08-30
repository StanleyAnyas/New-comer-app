import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    button: {
        // backgroundColor: "#fff",
        // borderColor: "black",
        // borderWidth: 1,
        // padding: 10,
        // borderRadius: 5,
        // margin: 10,
        // width: 100,
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
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
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
    saveButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
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
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingBottom: 10,
    },
    cancelButton: {
        borderRadius: 5,
    },
    deleteButton: {
        borderRadius: 5,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    goBackBtn: {
        marginRight: '70%',
        marginBottom: 10,
    },
});

export const listItems = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    listItemTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItemDetails: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    editIcon: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#ddd',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
});

export const searchComer = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 3,
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    listItemTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
  