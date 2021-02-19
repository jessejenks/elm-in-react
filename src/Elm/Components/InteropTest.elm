port module InteropTest exposing (..)
import Browser
import Html exposing (Html, div, span, text, input, button)
import Html.Events exposing (onInput, onClick)
import Html.Attributes exposing (type_, class, placeholder, value)
import Json.Decode as D
import Json.Encode as E

main : Program E.Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

type alias Model =
    { label : String
    , message : String
    , local : String
    }

defaultModel : Model
defaultModel = { label = "", message = "", local = "" }

init : E.Value -> ( Model, Cmd Msg )
init flags =
    ( case D.decodeValue decoder flags of
        Ok model -> model
        Err _ -> defaultModel
    , Cmd.none 
    )

decoder : D.Decoder Model
decoder =
    D.map3 Model
        (D.field "label" D.string)
        (D.field "message" D.string)
        (D.field "local" D.string)

type Msg
    = LocalChanged String
    | Received String
    | Send

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LocalChanged value ->
            ( { model | local = value }
            , Cmd.none
            )
        Received message ->
            ( { model | message = message }
            , Cmd.none
            )
        Send ->
            ( model
            , sendMessage model.local
            )

view : Model -> Html Msg
view model =
    div []
        [ div [] [ text model.label ]
        , div []
            [ text "Value from React component: "
            , span [ class "message" ] [ text model.message ]
            ]
        , input
            [ type_ "text"
            , placeholder "Type Here"
            , value model.local
            , onInput LocalChanged
            ] []
        , button
            [ type_ "button", onClick Send ] [ text "Send value to React" ]
        ]

port sendMessage : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions _ =
    messageReceiver Received