import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/registrations";

module {
  public func submit(
    registrations : List.List<Types.Registration>,
    nextId : { var val : Nat },
    input : Types.RegistrationInput,
  ) : Types.SubmitResult {
    if (input.name.size() == 0) {
      return #err("Name is required");
    };
    if (input.email.size() == 0) {
      return #err("Email is required");
    };
    let id = nextId.val;
    nextId.val += 1;
    let registration : Types.Registration = {
      id;
      name = input.name;
      email = input.email;
      phone = input.phone;
      interests = input.interests;
      message = input.message;
      submittedAt = Time.now();
    };
    registrations.add(registration);
    #ok(id);
  };

  public func listAll(
    registrations : List.List<Types.Registration>
  ) : [Types.Registration] {
    registrations.toArray();
  };
};
