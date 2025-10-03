package com.dmarc.cordovacall;

import android.content.Intent;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.telecom.Connection;
import android.telecom.ConnectionRequest;
import android.telecom.ConnectionService;
import android.telecom.DisconnectCause;
import android.telecom.PhoneAccountHandle;
import android.telecom.StatusHints;
import android.telecom.TelecomManager;
import android.util.Log;
import java.util.ArrayList;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;
import org.json.JSONException;

public class MyConnectionService extends ConnectionService {

    private static String TAG = "MyConnectionService";
    private static Connection conn;

    public static Connection getConnection() {
        return conn;
    }

    public static void deinitConnection() {
        conn = null;
    }

    @Override
    public Connection onCreateIncomingConnection(
        final PhoneAccountHandle connectionManagerPhoneAccount,
        final ConnectionRequest request
    ) {
        final Connection connection = new Connection() {
            @Override
            public void onAnswer() {
                Log.d(TAG, "=== onAnswer called ===");

                this.setActive();

                try {
                    Intent intent = new Intent(
                        CordovaCall.getCordova()
                            .getActivity()
                            .getApplicationContext(),
                        CordovaCall.getCordova().getActivity().getClass()
                    );
                    intent.addFlags(
                        Intent.FLAG_ACTIVITY_NEW_TASK |
                        Intent.FLAG_ACTIVITY_SINGLE_TOP |
                        Intent.FLAG_ACTIVITY_CLEAR_TOP |
                        Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT
                    );
                    intent.putExtra("CALLKIT_ANSWER", true);

                    CordovaCall.getCordova()
                        .getActivity()
                        .getApplicationContext()
                        .startActivity(intent);

                    Handler handler = new Handler();
                    handler.postDelayed(
                        new Runnable() {
                            @Override
                            public void run() {
                                sendAnswerCallbacks();
                            }
                        },
                        500
                    );
                } catch (Exception e) {
                    Log.e(TAG, "Error bringing app to foreground", e);
                    sendAnswerCallbacks();
                }
            }

            private void sendAnswerCallbacks() {
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("answer");
                Log.d(
                    TAG,
                    "Sending answer callbacks, count: " +
                    (callbackContexts != null ? callbackContexts.size() : 0)
                );

                if (callbackContexts != null) {
                    for (final CallbackContext callbackContext : callbackContexts) {
                        CordovaCall.getCordova()
                            .getThreadPool()
                            .execute(
                                new Runnable() {
                                    public void run() {
                                        try {
                                            JSONObject callData = new JSONObject();
                                            String callUUID = CordovaCall.getCurrentCallUUID();
                                            if (callUUID != null) {
                                                callData.put("callUUID", callUUID);
                                            }
                                            callData.put("isVideo", false); // Can be determined from call type

                                            PluginResult result = new PluginResult(
                                                PluginResult.Status.OK,
                                                callData
                                            );
                                            result.setKeepCallback(true);
                                            callbackContext.sendPluginResult(result);
                                        } catch (JSONException e) {
                                            Log.e(TAG, "Error creating answer callback JSON", e);
                                            PluginResult result = new PluginResult(
                                                PluginResult.Status.ERROR,
                                                "Error creating answer callback data"
                                            );
                                            result.setKeepCallback(true);
                                            callbackContext.sendPluginResult(result);
                                        }
                                    }
                                }
                            );
                    }
                }
            }

            @Override
            public void onReject() {
                DisconnectCause cause = new DisconnectCause(
                    DisconnectCause.REJECTED
                );
                this.setDisconnected(cause);
                this.destroy();
                conn = null;
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("reject");
                for (final CallbackContext callbackContext : callbackContexts) {
                    CordovaCall.getCordova()
                        .getThreadPool()
                        .execute(
                            new Runnable() {
                                public void run() {
                                    PluginResult result = new PluginResult(
                                        PluginResult.Status.OK,
                                        "reject event called successfully"
                                    );
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                }
                            }
                        );
                }
            }

            @Override
            public void onAbort() {
                super.onAbort();
            }

            @Override
            public void onDisconnect() {
                DisconnectCause cause = new DisconnectCause(
                    DisconnectCause.LOCAL
                );
                this.setDisconnected(cause);
                this.destroy();
                conn = null;
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("hangup");
                for (final CallbackContext callbackContext : callbackContexts) {
                    CordovaCall.getCordova()
                        .getThreadPool()
                        .execute(
                            new Runnable() {
                                public void run() {
                                    PluginResult result = new PluginResult(
                                        PluginResult.Status.OK,
                                        "hangup event called successfully"
                                    );
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                }
                            }
                        );
                }
            }
        };
        Bundle extras = request.getExtras();
        String callerName = extras.getString("caller_name");
        String fromUri = extras.getString("from");

        connection.setAddress(
            Uri.parse(fromUri),
            TelecomManager.PRESENTATION_UNKNOWN
        );

        if (callerName != null) {
            connection.setCallerDisplayName(
                callerName,
                TelecomManager.PRESENTATION_ALLOWED
            );
        }
        Icon icon = CordovaCall.getIcon();
        if (icon != null) {
            StatusHints statusHints = new StatusHints(
                (CharSequence) "",
                icon,
                new Bundle()
            );
            connection.setStatusHints(statusHints);
        }
        conn = connection;
        ArrayList<CallbackContext> callbackContexts =
            CordovaCall.getCallbackContexts().get("receiveCall");
        for (final CallbackContext callbackContext : callbackContexts) {
            CordovaCall.getCordova()
                .getThreadPool()
                .execute(
                    new Runnable() {
                        public void run() {
                            PluginResult result = new PluginResult(
                                PluginResult.Status.OK,
                                "receiveCall event called successfully"
                            );
                            result.setKeepCallback(true);
                            callbackContext.sendPluginResult(result);
                        }
                    }
                );
        }
        return connection;
    }

    @Override
    public Connection onCreateOutgoingConnection(
        PhoneAccountHandle connectionManagerPhoneAccount,
        ConnectionRequest request
    ) {
        final Connection connection = new Connection() {
            @Override
            public void onAnswer() {
                Log.d(TAG, "=== onAnswer called (outgoing) ===");

                this.setActive();

                try {
                    Intent intent = new Intent(
                        CordovaCall.getCordova()
                            .getActivity()
                            .getApplicationContext(),
                        CordovaCall.getCordova().getActivity().getClass()
                    );
                    intent.addFlags(
                        Intent.FLAG_ACTIVITY_NEW_TASK |
                        Intent.FLAG_ACTIVITY_SINGLE_TOP |
                        Intent.FLAG_ACTIVITY_CLEAR_TOP |
                        Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT
                    );
                    intent.putExtra("CALLKIT_ANSWER", true);

                    CordovaCall.getCordova()
                        .getActivity()
                        .getApplicationContext()
                        .startActivity(intent);

                    Handler handler = new Handler();
                    handler.postDelayed(
                        new Runnable() {
                            @Override
                            public void run() {
                                sendAnswerCallbacks();
                            }
                        },
                        500
                    );
                } catch (Exception e) {
                    Log.e(TAG, "Error bringing app to foreground", e);
                    sendAnswerCallbacks();
                }
            }

            private void sendAnswerCallbacks() {
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("answer");
                Log.d(
                    TAG,
                    "Sending answer callbacks, count: " +
                    (callbackContexts != null ? callbackContexts.size() : 0)
                );

                if (callbackContexts != null) {
                    for (final CallbackContext callbackContext : callbackContexts) {
                        CordovaCall.getCordova()
                            .getThreadPool()
                            .execute(
                                new Runnable() {
                                    public void run() {
                                        try {
                                            JSONObject callData = new JSONObject();
                                            String callUUID = CordovaCall.getCurrentCallUUID();
                                            if (callUUID != null) {
                                                callData.put("callUUID", callUUID);
                                            }
                                            callData.put("isVideo", false); // Can be determined from call type

                                            PluginResult result = new PluginResult(
                                                PluginResult.Status.OK,
                                                callData
                                            );
                                            result.setKeepCallback(true);
                                            callbackContext.sendPluginResult(result);
                                        } catch (JSONException e) {
                                            Log.e(TAG, "Error creating answer callback JSON", e);
                                            PluginResult result = new PluginResult(
                                                PluginResult.Status.ERROR,
                                                "Error creating answer callback data"
                                            );
                                            result.setKeepCallback(true);
                                            callbackContext.sendPluginResult(result);
                                        }
                                    }
                                }
                            );
                    }
                }
            }

            @Override
            public void onReject() {
                DisconnectCause cause = new DisconnectCause(
                    DisconnectCause.REJECTED
                );
                this.setDisconnected(cause);
                this.destroy();
                conn = null;
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("reject");
                for (final CallbackContext callbackContext : callbackContexts) {
                    CordovaCall.getCordova()
                        .getThreadPool()
                        .execute(
                            new Runnable() {
                                public void run() {
                                    PluginResult result = new PluginResult(
                                        PluginResult.Status.OK,
                                        "reject event called successfully"
                                    );
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                }
                            }
                        );
                }
            }

            @Override
            public void onAbort() {
                super.onAbort();
            }

            @Override
            public void onDisconnect() {
                DisconnectCause cause = new DisconnectCause(
                    DisconnectCause.LOCAL
                );
                this.setDisconnected(cause);
                this.destroy();
                conn = null;
                ArrayList<CallbackContext> callbackContexts =
                    CordovaCall.getCallbackContexts().get("hangup");
                for (final CallbackContext callbackContext : callbackContexts) {
                    CordovaCall.getCordova()
                        .getThreadPool()
                        .execute(
                            new Runnable() {
                                public void run() {
                                    PluginResult result = new PluginResult(
                                        PluginResult.Status.OK,
                                        "hangup event called successfully"
                                    );
                                    result.setKeepCallback(true);
                                    callbackContext.sendPluginResult(result);
                                }
                            }
                        );
                }
            }

            @Override
            public void onStateChanged(int state) {
                if (state == Connection.STATE_DIALING) {
                    final Handler handler = new Handler();
                    handler.postDelayed(
                        new Runnable() {
                            @Override
                            public void run() {
                                Intent intent = new Intent(
                                    CordovaCall.getCordova()
                                        .getActivity()
                                        .getApplicationContext(),
                                    CordovaCall.getCordova()
                                        .getActivity()
                                        .getClass()
                                );
                                intent.addFlags(
                                    Intent.FLAG_ACTIVITY_NEW_TASK |
                                    Intent.FLAG_ACTIVITY_SINGLE_TOP
                                );
                                CordovaCall.getCordova()
                                    .getActivity()
                                    .getApplicationContext()
                                    .startActivity(intent);
                            }
                        },
                        500
                    );
                }
            }
        };
        connection.setAddress(
            Uri.parse(request.getExtras().getString("to")),
            TelecomManager.PRESENTATION_ALLOWED
        );
        Icon icon = CordovaCall.getIcon();
        if (icon != null) {
            StatusHints statusHints = new StatusHints(
                (CharSequence) "",
                icon,
                new Bundle()
            );
            connection.setStatusHints(statusHints);
        }
        connection.setDialing();
        conn = connection;
        ArrayList<CallbackContext> callbackContexts =
            CordovaCall.getCallbackContexts().get("sendCall");
        if (callbackContexts != null) {
            for (final CallbackContext callbackContext : callbackContexts) {
                CordovaCall.getCordova()
                    .getThreadPool()
                    .execute(
                        new Runnable() {
                            public void run() {
                                PluginResult result = new PluginResult(
                                    PluginResult.Status.OK,
                                    "sendCall event called successfully"
                                );
                                result.setKeepCallback(true);
                                callbackContext.sendPluginResult(result);
                            }
                        }
                    );
            }
        }
        return connection;
    }
}
