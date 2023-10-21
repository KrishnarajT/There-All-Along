import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';

const DialogDisplay = (props) => {
    const [visible, setVisible] = React.useState(props.visible);

    const hideDialog = () => setVisible(false);

    return (
        <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Content>
                <Text variant="bodyMedium">{props.body}</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default DialogDisplay;