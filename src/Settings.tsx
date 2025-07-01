import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { General } from "@vendetta/ui/components";

const { View } = ReactNative;
const { FormSwitchRow } = General;

export default function Settings() {
  return (
    <View style={{ padding: 16 }}>
      <FormSwitchRow
        label="Enable Return-as-Send"
        value={!!storage.enabled}
        onValueChange={(v) => {
          storage.enabled = v;
        }}
      />
    </View>
  );
}
