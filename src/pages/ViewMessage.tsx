import React, { useEffect, useRef, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonModal,
  IonToggle,
} from "@ionic/react";
import { useHistory } from "react-router";

import "./ViewMessage.css";

function ViewMessage() {
  const [enableDismissHack, setEnableDismissHack] = useState(false);

  const modalRef = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    console.log("mounted", { modal });
    return () => {
      console.log("unmounted", { modal, enableDismissHack });
      if (!modal || !enableDismissHack) return;
      console.log("dismiss animation");
      modal.dismiss();
    };
  }, [enableDismissHack]);

  const history = useHistory();
  const replace = () => history.replace("/home");
  const goBack = () => history.goBack();
  const push = () => history.push("/home");

  return (
    <IonModal
      isOpen
      backdropDismiss={false}
      ref={modalRef}
      id="view-message-page"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goBack}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>View Message</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {enableDismissHack && (
          <div>
            <code className="ion-padding">
              <div>{"useLayoutEffect(() => {"}</div>
              <div>{"const modal = modalRef.current;"}</div>
              <div>{"return () => {"}</div>
              <div>{"if (!modal) return;"}</div>
              <div>{"modal.dismiss();"}</div>
              <div>{"};"}</div>
              <div>{"}, []);"}</div>
            </code>
          </div>
        )}
        <IonItem lines="full">
          <IonLabel>Enable Hack</IonLabel>
          <IonToggle
            checked={enableDismissHack}
            onIonChange={(e) => setEnableDismissHack(e.detail.checked)}
          />
        </IonItem>
        <table>
          <thead>
            <tr>
              <th>Works</th>
              <th>Won't Work</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {enableDismissHack && (
                  <IonButton onClick={replace}>history.replace</IonButton>
                )}
              </td>
              <td>
                {!enableDismissHack && (
                  <IonButton color="danger" onClick={replace}>
                    history.replace
                  </IonButton>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <IonButton href="/home">href (?)</IonButton>
                <br />
                <IonText color="danger">
                  unmount callback is never called, no animation
                </IonText>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <IonButton onClick={goBack}>history.goBack (?)</IonButton>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                {enableDismissHack && (
                  <IonButton onClick={push}>history.push</IonButton>
                )}
              </td>
              <td>
                {!enableDismissHack && (
                  <IonButton color="danger" onClick={push}>
                    history.push
                  </IonButton>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </IonContent>
    </IonModal>
  );
}

export default ViewMessage;
