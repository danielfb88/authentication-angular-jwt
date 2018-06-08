export class UserModel {
    private  _id: string;
    private  name: string;
    private  email: string;
    private  password: string;
    private  company: string;
    private  role: string;

    public getId():string {
        return this._id;
    }

    public setId(_id: string) {
        this._id = _id;
    }

  public getName():string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

    public getEmail():string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getPassword():string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getCompany():string {
        return this.company;
    }

    public setCompany(company: string) {
        this.company = company;
    }

    public getRole():string {
        return this.role;
    }

    public setRole(role: string) {
        this.role = role;
    }
}
