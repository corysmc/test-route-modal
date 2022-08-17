import React, { useEffect, useRef, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonTextarea,
  IonToast,
  IonModal,
  IonToggle,
} from "@ionic/react";
import "./Login.scss";
import { connect } from "../data/connect";
import { useHistory } from "react-router";

interface OwnProps {}

interface DispatchProps {}

interface SupportProps extends OwnProps, DispatchProps {}

const SupportModal: React.FC<SupportProps> = () => {
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [enableDismissHack, setEnableDismissHack] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!message) {
      setMessageError(true);
    }
    if (message) {
      setMessage("");
      setShowToast(true);
    }
  };

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
  const replace = () => history.replace("/support");
  const goBack = () => history.goBack();
  const push = () => history.push("/support");

  return (
    <IonModal isOpen backdropDismiss={false} ref={modalRef} id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goBack}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Support Modal</IonTitle>
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
                <IonButton href="/support">href (?)</IonButton>
                <br />
                <IonText color="danger">
                  unmount callback is never called, no animation
                </IonText>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <IonButton onClick={goBack}>
                  history.goBack (?)
                </IonButton>
                <br />
                <IonText color="danger">
                  unmount callback is never called, no animation
                </IonText>
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

        <IonText>All of these solutions don't have animations though.</IonText>

        <form noValidate onSubmit={send}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Enter your support message below
              </IonLabel>
              <IonTextarea
                name="message"
                value={message}
                spellCheck={false}
                autocapitalize="off"
                rows={6}
                onIonChange={(e) => setMessage(e.detail.value!)}
                required
              ></IonTextarea>
            </IonItem>

            {formSubmitted && messageError && (
              <IonText color="danger">
                <p className="ion-padding-start">Support message is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>

      <IonToast
        isOpen={showToast}
        duration={3000}
        message="Your support request has been sent"
        onDidDismiss={() => setShowToast(false)}
      />
    </IonModal>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: SupportModal,
});
