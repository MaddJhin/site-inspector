import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';

import {
  Form,
  Separator, InputField, LinkField,
  SwitchField, PickerField, DatePickerField, TimePickerField
} from 'react-native-form-generator';


export default class SiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
  }
  handleFormChange(formData) {
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({ formData: formData })
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component) {
    //console.log(e, component);
  }

  handleFormSubmit(formData) {
    
  }

  openTermsAndConditionsURL() {

  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{ paddingLeft: 10, paddingRight: 10, margin: 10, height: 200 }}>

        {/* <Form
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          onPress= {this.handleFormSubmit.bind(this)}
          label="Personal Information">
          <Separator />
          <InputField
            ref='first_name'
            label='First Name'
            placeholder='First Name'
            helpText={((self) => {

              if (Object.keys(self.refs).length !== 0) {
                if (!self.refs.registrationForm.refs.first_name.valid) {
                  return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
                }

              }

            })(this)}
            validationFunction={[(value) => {

              if (value == '') return "Required";
              //Initial state is null/undefined
              if (!value) return true;
              // Check if First Name Contains Numbers
              var matches = value.match(/\d+/g);
              if (matches != null) {
                return "First Name can't contain numbers";
              }

              return true;
            }, (value) => {
              ///Initial state is null/undefined
              if (!value) return true;
              if (value.indexOf('4') != -1) {
                return "I can't stand number 4";
              }
              return true;
            }]}
          />
          <InputField ref='last_name' placeholder='Last Name' />
          <InputField
            multiline={true}
            ref='other_input'
            placeholder='Other Input'
            helpText='this is an helpful text it can be also very very long and it will wrap' />
          <Separator />
          <SwitchField label='I accept Terms & Conditions'
            ref="has_accepted_conditions"
            helpText='Please read carefully the terms & conditions' />
          <PickerField ref='gender'
            label='Choose Gender'
            options={{
              male: 'Male',
              female: 'Female'
            }} 
            validationFunction={ (value) => {
              ///Initial state is null/undefined
              if (value == "") return "Required";

              return true;
            }}
            />
        </Form>

        <View>
          <Text>{JSON.stringify(this.state.formData)}</Text>
        </View>

        <Separator /> */}

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.props.toggleVisible}
            title="Confirm"
            color="#228B22"
            accessibilityLabel="Add new site" />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10
  }
});