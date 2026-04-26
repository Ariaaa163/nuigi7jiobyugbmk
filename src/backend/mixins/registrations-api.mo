import List "mo:core/List";
import Types "../types/registrations";
import RegistrationsLib "../lib/registrations";

mixin (
  registrations : List.List<Types.Registration>,
  nextRegistrationId : { var val : Nat },
) {
  /// Submit a new registration. Returns the new registration ID on success.
  public func submitRegistration(input : Types.RegistrationInput) : async Types.SubmitResult {
    RegistrationsLib.submit(registrations, nextRegistrationId, input);
  };

  /// Retrieve all registrations (admin use).
  public query func getRegistrations() : async [Types.Registration] {
    RegistrationsLib.listAll(registrations);
  };
};
