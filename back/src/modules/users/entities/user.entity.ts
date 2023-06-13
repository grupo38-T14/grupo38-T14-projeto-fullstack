export class User {
    readonly id:    string
    
    name:           string
    email:          string
    cpf:            string
    phone:          string
    birth?:         string
    description?:   string
    password:       string
    account_type:   boolean
    // is_active?:     boolean
    avatar_url:     string

    readonly created_at: Date
}
