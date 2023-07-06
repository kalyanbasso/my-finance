import { View, Text } from "react-native";
import { FormTypes } from "../../../form/createTransaction/createTransactionForm";

export type HeaderTypes = {
    submit: (data: FormTypes) => Promise<void>
};

export function HeaderUI({  }: HeaderTypes) {
    return (
        <View>
            <Text>titulo</Text>
        </View>
    );
}