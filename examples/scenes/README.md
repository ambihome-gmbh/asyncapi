# Scenes


- sender trait for payloads -> https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageTraitObject
- scn_config_payload scene_id = null fuer cmd-add

bessere fehlermeldungen in macros. -- schema param to use war falsch (non ex)

# {:error,
#  {{:function_clause,
#    [
#      {IO, :chardata_to_string, [nil], [file: ~c"lib/io.ex", line: 710]},
#      {File, :read, 1, [file: ~c"lib/file.ex", line: 371]},
#      {File, :read!, 1, [file: ~c"lib/file.ex", line: 380]},
#      {Asyncapi, :load, 1, [file: ~c"lib/asyncapi.ex", line: 56]},
#      {MqttAsyncapi, :init, 1, [file: ~c"lib/mqtt_asyncapi.ex", line: 77]},
#      {:gen_server, :init_it, 2, [file: ~c"gen_server.erl", line: 2229]},
#      {:gen_server, :init_it, 6, [file: ~c"gen_server.erl", line: 2184]},
#      {:proc_lib, :init_p_do_apply, 3, [file: ~c"proc_lib.erl", line: 329]}
#    ]},
#   {:child, :undefined, CoboServices.Scenes, {CoboServices.Scenes, :start_link, [[]]}, :permanent, false, 5000,
#    :worker, [CoboServices.Scenes]}}}



licht1=0 -> ETS: licht1=0
licht2=0 -> ETS: licht1=0,licht2=0
SCN1.add(member: licht1,licht2)
ETS.allvalues(licht1,licht2) -> SCN.state{SCN1: licht1=0,licht2=0}
licht1=1 -> ETS: licht1=1,licht2=0
...
SCN1.call -> licht1=0,licht2=0 -> KNX