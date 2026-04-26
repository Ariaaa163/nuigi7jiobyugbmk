module {
  public type RegistrationId = Nat;

  public type Registration = {
    id : RegistrationId;
    name : Text;
    email : Text;
    phone : Text;
    interests : Text;
    message : Text;
    submittedAt : Int;
  };

  public type RegistrationInput = {
    name : Text;
    email : Text;
    phone : Text;
    interests : Text;
    message : Text;
  };

  public type SubmitResult = {
    #ok : RegistrationId;
    #err : Text;
  };
};
