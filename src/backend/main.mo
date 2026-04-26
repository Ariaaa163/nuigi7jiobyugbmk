import List "mo:core/List";
import Types "types/registrations";
import RegistrationsApi "mixins/registrations-api";

actor {
  let registrations = List.empty<Types.Registration>();
  var nextRegistrationId : Nat = 0;
  let nextRegistrationIdRef = { var val = nextRegistrationId };

  include RegistrationsApi(registrations, nextRegistrationIdRef);
};
