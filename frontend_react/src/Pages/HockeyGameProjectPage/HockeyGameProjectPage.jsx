import React from 'react';
import scssVars from "./HockeyGameProjectPage.scss";
import Logo from "./Images/GameLogo.png";
import ProjectPageLayout from "components/ProjectPageLayout/ProjectPageLayout";
import TitleVideo from "./Videos/TitleVideo.mp4";
import StateHierarchyDiagram from "./Images/StateHierarchy.svg";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faCode, faScrewdriverWrench, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import CodeBlock from "components/CodeBlock/CodeBlock";

const HockeyGameProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <ProjectPageLayout>
      <div className={`ProjectPage__Header`}>
        <img src={Logo} alt="Hockey Game Logo"/>
        <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
          <source src={TitleVideo} type="video/mp4" />
        </video>
        <section className={`${cn}__ProjectCardsContainer`}>
          <ProjectCard project={cn} title="About">
            <p>This is a 2D top down Hockey Game with elements of fighting that I created for a company I worked for 2024-2025. I continue to work on it and continue improving it to release on steam.</p>
          </ProjectCard>
          <ProjectCard project={cn} title="Project Info">
            <div className="ProjectCard__Info">
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faUsers}/>
                <p className="ProjectCard__Text">Team Size: 3</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faUser}/>
                <p className="ProjectCard__Text">Role: Programmer, Game designer</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faScrewdriverWrench}/>
                <p className="ProjectCard__Text">Engine: Unity</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faCode}/>
                <p className="ProjectCard__Text">LOC: 20000</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faClock}/>
                <p className="ProjectCard__Text">Time Frame: 2025-Ongoing</p>
              </div>
            </div>
          </ProjectCard>
        </section>
      </div>
      <div className={`${cn}__Section`}>
        <h2>Tech Stack</h2>
        <div className={`${cn}__Tech`}>
          <span>Unity</span>
          <span>C#</span>
          <span>State machine</span>
          <span>GOAP</span>
          <span>AI</span>
          <span>Clean Code</span>
          <span>Clean Architecture</span>
        </div>
      </div>
      <div className={`${cn}__Section`}>
        <h2>Table of Contents</h2>
        <ul className={`${cn}__TableOfContents`}>
          <li><a href="#Introduction">Introduction</a></li>
        </ul>
      </div>
      <div className={`${cn}__Section`}>
        <h2 id="Introduction">Introduction</h2>
        <p>I've created this project for a company I worked for 2024-2025. This is a fun and creative project which let me learn a lot of new things: I learned design patterns such as state machines on a much deeper level and started to understand it on a much deeper level, I learned about AI design patterns and I implemented AI for the game as a mix of states of a state machines and GOAP. This allowed me to create a robust AI system that's easy to extend: only new code needs to be added to extend the AI and create new behaviors and logic based on inputs.</p>
        <p>This hockey game is a fun and challenging project for me, where I had the opportunity to work on creating my own state machines and GOAP systems for character state, character and team AI collaboration systems, focusing on creating a robust, solid, tested and easily expandable AI and character state systems.</p>
      </div>
      <div className={`${cn}__Section`}>
        <h2 id="CharacterState">Character State and state machines</h2>
        <a href="https://github.com/KulaGGin/StateMachine">Code - State Machine library</a>
        <p>First, I started small: with just a character and a level sprite and a tick function to process movement inputs and move the character. But it quickly became apparent that I need to manage a lot of state and how character reacts to different inputs and events: what if character just stands and I press movement inputs, what if I press an attack button, what if character gets hit in standing state, what if it gets hit in a grounded state, etc.</p>
        <p>There was, of course, state design pattern asking to be implemented. I ended up TDD'ing a generic state machine library following a curiously reoccurring template pattern, so I can extend it for specific use cases. So far I ended up with those state machines in the libraty: generic state machine, unity state machine which supports unity events(inherits from state machine), stack state machine(inherits from state machine), hierarchical state machine.
          Those are generic base state machines that specific concrete state machines in the game inherit: character locomotion state machine is a hierarchical unity state machine with support for unity events, main menu state machine is a stack state machine that allows for comfortable menu navigation, Team and character AI controllers uses flat Unity state machines.</p>
        <p>Overall, I would say I managed to write an organic system with only as much of algorithmic, cyclomatic and cognitive complexity as absolutely required and a system that's comfortable to work with. Let's examine the characters classes. First of all, notice that we have 2 types of characters: field player and a goalkeeper. They interact with all the same things: the puck and opponent players. The field player and the goalkeeper are 2 different MonoBehavior classes that share the same base: HockeyPlayerBase.</p>
        <CodeBlock
          title="HockeyPlayerBase.cs"
          language="csharp">{`public abstract class HockeyPlayerBase : WorldObject {
    ...
    public readonly Axis<Vector2> Movement = new();
    public readonly HockeyAction Attack1 = new();
    public readonly HockeyAction Attack2 = new();
    public readonly HockeyAction HalfCircle = new();
    public readonly HockeyAction Sprint = new();
    
    void Start() {
        StateMachine = CreateStateMachine();
        StateMachine.StartStateMachine(InitialState);
    }

    void Update() => StateMachine?.FrameUpdate();
    void FixedUpdate() => StateMachine?.PhysicsUpdate();
    void LateUpdate() => StateMachine?.LateUpdate();
    
    public void GetHit(GettingHitArgs GettingHitArgs) => StateMachine.Send(new GetHitEvent(GettingHitArgs));
    public void GetHitHard(float Damage, float DirectionX) => StateMachine.Send(new GetHitHardEvent(Damage, DirectionX));
    public void GetHitByPuck(Puck Puck, float DirectionX) => StateMachine.Send(new GetHitByPuckEvent(DirectionX));
    public void GetLaunchedBySuperPuck(Puck Puck, int DirectionX) => StateMachine.Send(new SuperPuckEvent(DirectionX));
    public void OnAnimationFinished() => StateMachine.Send(new AnimationFinishedEvent());
    public void OnClubSwung() => StateMachine.Send(new ClubSwungEvent());
    
    public void AttackingCollider_OnOverlappingStarted(Collider2D o, GameObject g) {
        CollidingGameObjects.Add(g);
        StateMachine.Send(new AttackOverlapStartedEvent(o, g));
    }

    public void AttackingCollider_OnOverlappingEnded(Collider2D o, GameObject g) {
        CollidingGameObjects.Remove(g);
        StateMachine.Send(new AttackOverlapEndedEvent(o, g));
    }

    void PuckCollider_OnOverlappingStarted(Collider2D o, GameObject g) => StateMachine.Send(new PuckOverlapStartedEvent(o, g));
    void PuckCollider_OnOverlappingStay(Collider2D o, GameObject g) => StateMachine.Send(new PuckOverlapStayEvent(o, g));
}`}
        </CodeBlock>
        <p>Shared code between FieldPlayer and Goalkeeper classes are shared, while unique things are unique to those classes. Most things still live in HockeyPlayerBase. For example, you can see that the state machine is created in the Start method with the CreateStateMachine. The CreateStateMachine is a virtual method that is overriden inside the FieldPlayer and Goalkeeper classes and they create the specific state machine. Here's how it's done in the Goalkeeper class:</p>
        <CodeBlock title="Goalkeeper.cs" language="csharp">
          {`public class Goalkeeper : HockeyPlayerBase {
    protected override IHockeyPlayerStateMachine CreateStateMachine() => new GoalkeeperStateMachine(gameObject);
    protected override Type InitialState => typeof(GoalkeeperMoving);
    
    ...
}`}
        </CodeBlock>
        <p>The state machines and the states they hold are different between the FieldPlayer and Goalkeeper because they interact with the world in quite different ways. Now let's see a few FieldPlayer states that allow the field player to move:</p>
        <CodeBlock title="Moving Classes" language="csharp">
          {`public class MovingNormal : Moving {
    public MovingNormal(GameObject HockeyPlayerGameObject, FieldPlayerStateMachine StateMachine) : base(HockeyPlayerGameObject, StateMachine) {
        AnimationClipName = "Movement";
    }

    public override void PhysicsUpdate() {
        base.PhysicsUpdate();
        const float StaminaToSprint = 20;
        if(HockeyPlayer.Sprint.JustBegun && HockeyPlayer.Stamina > StaminaToSprint) {
            float SprintingDirectionX = !Mathf.Approximately(HockeyPlayer.Movement.Value.x, 0)
                ? HockeyPlayer.Movement.Value.x.Sign()
                : HockeyPlayer.FacingDirectionX.Sign();
            ApplyState<Sprinting>(SprintingDirectionX);
        }
    }
}

public class MovingLost : Moving {
    public MovingLost(GameObject HockeyPlayerGameObject, FieldPlayerStateMachine StateMachine) : base(HockeyPlayerGameObject, StateMachine) {
        AnimationClipName = "Skate Lost";
        MovementMultiplier = 0.35f;
    }
}

public class Sprinting : MovingStateBase, IHandle<BlockOverlapStartedEvent> {
    public Sprinting(GameObject HockeyPlayerGameObject, FieldPlayerStateMachine StateMachine)
        : base(HockeyPlayerGameObject, StateMachine) {
        AnimationClipName = "Movement";
        Animator.speed = 2;
    }
...
    public override void PhysicsUpdate() {
        DrainStamina();
        HockeyPlayer.FacingDirection = new(SprintingDirectionX, 0);

        if(HockeyPlayer.Movement.Value.x * SprintingDirectionX < 0) { ApplyState<TStop>(); return; }

        if(HockeyPlayer.Attack1.JustBegun) {
            if(HockeyPlayer.Puck.IsNotValid()) ApplyState<AttackSpin>();
            else                               ApplyState<HitPuckLightStart>();
            return;
        }
        if(HockeyPlayer.HalfCircle.JustBegun) {
            float ValueToPass = HockeyPlayer.Movement.Value.y == 0 ? -1 : HockeyPlayer.Movement.Value.y;
            ApplyState<HalfCircle>(ValueToPass);
            return;
        }
        Vector2 MovementVelocity = Vector2.zero;
        MovementVelocity.x = SprintingDirectionX * SprintingMultiplier * HockeyPlayer.MaxSpeed;
        MovementVelocity.y = HockeyPlayer.Movement.Value.y * HockeyPlayer.MaxSpeed;
        Move(MovementVelocity);
    }
  ...
}`}
        </CodeBlock>
        <p>Also worth noting, I reached limits of state machines for some of them. The most visible and obvious one is character AI state machine. While it works, managing all different states for each game situation with different states and switching between them became cumbersome and there is definitely a better system for this. One of them is GOAP. It should allow for even more robust and complex AI that would be a perfect fit for a game like this: we want the AI to be unpredictable and challenging for the player to beat.</p>

        <CodeBlock
          title="HierarchicalStateMachine.cs"
          language="csharp">
          {`public class HierarchicalStateMachine<TState> : UnityStateMachine<TState> where TState : Enum
{
    private readonly Dictionary<TState, StateMachine<TState>> _subMachines = new();

    public void RegisterSubMachine(TState parent, StateMachine<TState> subMachine)
    {
        _subMachines[parent] = subMachine;
    }

    public override void Tick()
    {
        base.Tick();
        if (_subMachines.TryGetValue(CurrentState, out var subMachine))
        {
            subMachine.Tick();
        }
    }
}`}
        </CodeBlock>
      </div>
      <div className={`${cn}__Section`}>
        <h2 id="CharacterState">Character state &amp; state machines</h2>
        <a href="https://github.com/KulaGGin/StateMachine">Code — open-source state-machine library</a>

        <p>
          I started small: a character sprite, a level, and a tick loop reading movement input. It quickly
          became a question of <em>state</em> — how should the character react to an input or event depending
          on what it's already doing? Attack while standing, get hit while skating, get hit while already
          down… each combination is a branch. A growing pile of <code>if</code>s — the State pattern, asking
          to be built.
        </p>

        {/* Save Asset 1 to Images/StateHierarchy.svg and import it (see wiring notes) */}
        <img
          className={`${cn}__Diagram`}
          src={StateHierarchyDiagram}
          alt="FieldPlayer state hierarchy: a MovingParent super-state over MovingNormal, MovingSprinting, TStop, HalfCircle and MovingLost, beneath a root FieldPlayerState that handles universal reactions"
        />

        <p>
          So I TDD'd a small, reusable state-machine library using the{" "}
          <strong>Curiously Recurring Template Pattern (CRTP)</strong>, so each concrete machine stays fully
          typed while reusing one core. The game composes several flavors from it: character locomotion is a{" "}
          <em>hierarchical</em> Unity machine, the menu is a <em>stack</em> machine, and the team/character AI
          are <em>flat</em> Unity machines.
        </p>

        <p>
          Reactions are event-driven. An event enters at the current leaf state and bubbles up its parent chain
          until a state handles it — so a leaf can override its parent or defer to it, with no{" "}
          <code>switch</code> statements:
        </p>

        <CodeBlock title="HierarchicalStateMachine.cs — event bubbling" language="csharp">{`// Events bubble from the current leaf state up its parent chain until one handles them.
public override bool Send<TEvent>(TEvent Event) {
    Type CurrentType = CurrentState.GetType();
    while (CurrentType != null) {
        if (States[CurrentType] is IHandle<TEvent> Handler && Handler.Handle(Event))
            return true;                                    // handled -> stop
        Parents.TryGetValue(CurrentType, out CurrentType);  // not mine -> ask the parent
    }
    return false;
}`}</CodeBlock>

        <p>
          Characters come in two kinds — field player and goalkeeper — that touch the same world (puck,
          opponents) in different ways. They share a <code>HockeyPlayerBase</code> MonoBehaviour that owns the
          machine and turns Unity callbacks and collisions into events:
        </p>

        <CodeBlock title="HockeyPlayerBase.cs" language="csharp">{`public abstract class HockeyPlayerBase : WorldObject {
    public readonly Axis<Vector2> Movement = new();
    public readonly HockeyAction Attack1 = new();
    public readonly HockeyAction Sprint  = new();

    void Start() { StateMachine = CreateStateMachine(); StateMachine.StartStateMachine(InitialState); }
    void FixedUpdate() => StateMachine?.PhysicsUpdate();

    // Unity callbacks & collisions become events the current state can react to:
    public void GetHit(GettingHitArgs a)       => StateMachine.Send(new GetHitEvent(a));
    public void GetHitByPuck(Puck p, float dx) => StateMachine.Send(new GetHitByPuckEvent(dx));
    void PuckCollider_OnOverlappingStarted(Collider2D o, GameObject g)
        => StateMachine.Send(new PuckOverlapStartedEvent(o, g));
}`}</CodeBlock>

        <p>
          <code>CreateStateMachine</code> is virtual; each character builds its own machine and initial state:
        </p>

        <CodeBlock title="Goalkeeper.cs" language="csharp">{`public class Goalkeeper : HockeyPlayerBase {
    protected override IHockeyPlayerStateMachine CreateStateMachine() => new GoalkeeperStateMachine(gameObject);
    protected override Type InitialState => typeof(GoalkeeperMoving);
}`}</CodeBlock>

        <h3>A design decision I'm proud of: two axes of code reuse</h3>
        <p>
          The five locomotion states (normal, sprint, T-stop, half-circle, and a slowed "lost" skate) share a
          lot — but not the <em>same kind</em> of behavior. I split sharing along two axes:
        </p>
        <ul>
          <li>
            <strong>Leaf-independent, ambient behavior</strong> — enabling the puck collider, reacting to a
            heavy attack, picking up a loose puck — lives on the <strong>HSM parent</strong>. The machine
            delivers it to every sub-state automatically, and it's skipped on sibling transitions, so switching
            sub-states never needlessly re-runs it.
          </li>
          <li>
            <strong>State-specific behavior</strong> — playing <em>that</em> state's clip, its movement math —
            lives on a <strong>C# base</strong>, so it runs on the concrete state with its own data.
          </li>
        </ul>
        <p>
          The payoff: five states share code with zero duplication and no fragile <code>base</code> calls, and
          each state file reads as just its own concern:
        </p>

        <CodeBlock title="Locomotion — parent vs. leaf" language="csharp">{`// HSM PARENT (registered as a state): leaf-independent behavior the machine broadcasts
// to every moving sub-state, and that survives sibling transitions.
public class MovingParent : FieldPlayerState,
    IHandle<PuckOverlapStartedEvent>, IHandle<PuckOverlapStayEvent> {

    public override object EnterState(object a = null) {
        HockeyPlayer.PuckCollider.EnableCollider();
        RigidBody2D.linearVelocity = Vector2.zero;      // reset only when entering the Moving family
        return a;
    }
    public override void ExitState() => HockeyPlayer.PuckCollider.DisableCollider();

    public bool Handle(PuckOverlapStartedEvent e) { TryPickPuck(e.Owner); return true; }
    public bool Handle(PuckOverlapStayEvent e)    { TryPickPuck(e.Owner); return true; }
}

// A LEAF sub-state: only its own concern — start sprinting when the player has the stamina.
public class MovingNormal : MovingBase {
    public MovingNormal(GameObject go, FieldPlayerStateMachine sm) : base(go, sm) {
        AnimationClipName = "Movement";
    }

    public override void PhysicsUpdate() {
        RegenStamina();
        UpdateSpriteSide();
        Move(HockeyPlayer.Movement.Value * HockeyPlayer.MaxSpeed);

        const float StaminaToSprint = 20;
        if (HockeyPlayer.Sprint.JustBegun && HockeyPlayer.Stamina > StaminaToSprint) {
            float dirX = Mathf.Approximately(HockeyPlayer.Movement.Value.x, 0)
                ? HockeyPlayer.FacingDirectionX.Sign()
                : HockeyPlayer.Movement.Value.x.Sign();
            ApplyState<MovingSprinting>(dirX);
        }
    }
}`}</CodeBlock>

        <p>The library was built test-first; the test names read as its specification:</p>

        <CodeBlock title="HierarchicalStateMachineTests.cs — behavior spec" language="text">{`StartStateMachine_OnChildState_EntersChildBeforeParent
ApplyState_BetweenSiblings_DoesNotReExitSharedParent
ApplyState_BetweenCousins_ExitsUpToLowestCommonAncestorThenEntersDown
Send_WhenLeafReturnsFalse_BubblesToParent
Send_WhenStateDoesNotImplementHandler_SkipsItAndBubbles`}</CodeBlock>

        {/* HIGH-IMPACT: drop a short gameplay clip here mapping states to on-screen action.
      Uncomment once you have the asset and its import.
  <video className={`${cn}__Gif`} autoPlay loop muted playsInline preload="metadata">
    <source src={LocomotionGif} type="video/mp4" />
  </video> */}

        <p>
          One honest limitation: for the character <em>AI</em>, hand-authoring a state per game situation and
          wiring every transition became cumbersome — a sign it had outgrown a plain state machine. That pushed
          me toward GOAP, which lets the AI compose plans from small actions and stay unpredictable and
          challenging. <a href="#AI">More on the AI system below.</a>
        </p>
      </div>
    </ProjectPageLayout>
  )
}

export default HockeyGameProjectPage;
